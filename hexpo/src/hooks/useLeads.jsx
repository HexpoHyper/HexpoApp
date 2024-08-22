import { useState, useEffect, useCallback } from 'react';
import supabase from '../config/db';
import { useEnterprise } from './EnterpriseProvider';

const LOCAL_STORAGE_KEY = 'leadsData';
const DATA_EXPIRY_MS = 60 * 60 * 1000; 

const useLeads = (userId) => {
  const [leads, setLeads] = useState(null);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const { uniqueCategories } = useEnterprise();

  // Fetch leads function
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('requirement')
        .select('*')
        .eq('status', 'open')
        .in('category', uniqueCategories)
        .order('creation_date', { ascending: true });
      
      const { data, error } = await query;

      if (error) throw error;

      console.log("Fetched leads at: " + new Date().toLocaleTimeString());

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));

      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }, [uniqueCategories]);

  // Effect to handle fetching leads from local storage or Supabase
  useEffect(() => {
    const storedLeads = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLeads) {
      const { data, timestamp } = JSON.parse(storedLeads);
      const now = Date.now();

      if (now - timestamp < DATA_EXPIRY_MS) {
        setLeads(data);
        setLoading(false); 
      } else {
        fetchLeads(); 
      }
    } else {
      fetchLeads(); 
    }

    // Cleanup function to unsubscribe from the channel
    const cleanup = () => {
      if (channel) {
        channel.unsubscribe();
        console.log('Unsubscribed from channel');
      }
    };

    // Setup subscription to real-time changes
    const newChannel = supabase.channel(`leads:${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'requirement',
      }, () => {
        fetchLeads(); 
      })
      .subscribe();

    setChannel(newChannel);

    // Cleanup on unmount or when userId changes
    return cleanup;
  }, [userId, fetchLeads]); // Only trigger effect when userId or fetchLeads changes

  return { leads, loading };
};

export default useLeads;
