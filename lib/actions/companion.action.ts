'use server';

import { auth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '../supabase';
import { CreateCompanion, GetAllCompanions } from '@/types';
import { subjects } from '@/constants';

/**
 * Create a new companion
 */
export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select();

  if (error || !data) throw new Error(error?.message || 'Failed to create a companion');

  return data[0];
};

/**
 * Get all companions with optional filtering
 */
export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();
  let query = supabase.from('companions').select();

  if (subject && topic) {
    query = query.ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);

  return companions;
};

/**
 * Get a single companion by ID
 */
export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id);

  if (error) {
    console.log(error);
    return null;
  }

  return data[0];
};

/**
 * Add session history for the current user
 */
export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history')
    .insert({
      companion_id: companionId,
      user_id: userId,
    });

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Get last 5 sessions or dummy data if new user
 */
export const getRecentSessions = async () => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  if (!userId) return [];

  // Check if the user has any session history
  const { count, error: countError } = await supabase
    .from('session_history')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (countError) throw new Error(countError.message);

  if (!count || count === 0) {
    // Return dummy data for new users
    return [
      {
        id: 'demo-1',
        name: 'Intro AI Tutor',
        subject: 'General',
        topic: 'Getting Started',
        description: 'Learn how Dixi can guide your learning journey.',
        avatar: '/icons/ai.svg',
        isDummy: true,
      },
      {
        id: 'demo-2',
        name: 'Math Master',
        subject: 'Math',
        topic: 'Algebra Basics',
        description: 'Crack Algebra with Dixi’s AI tutor.',
        avatar: '/icons/math.svg',
        isDummy: true,
      },
    ];
  }

  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

/**
 * Get sessions for a specific user
 */
export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

/**
 * Get all companions created by a specific user
 */
export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('author', userId);

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Check if user is allowed to create a new companion
 */
export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();
  let limit = 0;

  if (has({ plan: 'pro' })) {
    return true;
  } else if (has({ feature: '3_companion_limit' })) {
    limit = 3;
  } else if (has({ feature: '10_companion_limit' })) {
    limit = 30;
  }

  const { data, error } = await supabase
    .from('companions')
    .select('id', { count: 'exact' })
    .eq('author', userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length ?? 0;

  return companionCount < limit;
};
