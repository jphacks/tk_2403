ALTER TABLE "evacuation_place" DROP CONSTRAINT "evacuation_place_area_id_area_id_fk";
--> statement-breakpoint
ALTER TABLE "evacuation_place" DROP COLUMN IF EXISTS "area_id";