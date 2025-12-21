-- Fix the orders table to use TEXT for user_id instead of UUID
-- This supports the demo user system which uses IDs like "demo-1766229072687"

-- Step 1: Drop existing RLS policies that reference user_id
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;

-- Step 2: Alter the user_id column type from UUID to TEXT
ALTER TABLE orders ALTER COLUMN user_id TYPE TEXT;

-- Step 3: Recreate RLS policies with TEXT comparison
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid()::text = user_id OR user_id LIKE 'demo-%');

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'demo-%');

-- Also fix the wishlist table if it has the same issue
DROP POLICY IF EXISTS "Users can view their own wishlist" ON wishlist;
DROP POLICY IF EXISTS "Users can insert their own wishlist" ON wishlist;
DROP POLICY IF EXISTS "Users can delete their own wishlist" ON wishlist;

ALTER TABLE wishlist ALTER COLUMN user_id TYPE TEXT;

CREATE POLICY "Users can view their own wishlist" ON wishlist
  FOR SELECT USING (auth.uid()::text = user_id OR user_id LIKE 'demo-%');

CREATE POLICY "Users can insert their own wishlist" ON wishlist
  FOR INSERT WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'demo-%');

CREATE POLICY "Users can delete their own wishlist" ON wishlist
  FOR DELETE USING (auth.uid()::text = user_id OR user_id LIKE 'demo-%');
