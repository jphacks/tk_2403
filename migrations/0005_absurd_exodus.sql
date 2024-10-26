ALTER TABLE "area" RENAME COLUMN "name" TO "address";--> statement-breakpoint
ALTER TABLE "evacuation_place" DROP COLUMN IF EXISTS "formatted_address";--> statement-breakpoint
ALTER TABLE "evacuation_place" ADD CONSTRAINT "evacuation_place_profile_id_unique" UNIQUE("profile_id");