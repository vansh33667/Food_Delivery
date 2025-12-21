-- Add delivery_address column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address JSONB;

-- Add total_amount for multi-item order support
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount NUMERIC;

-- Update existing orders to have a default delivery address
UPDATE orders SET delivery_address = '{"apartment": "", "city": "", "state": ""}' WHERE delivery_address IS NULL;
