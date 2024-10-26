ALTER TABLE "request" DROP CONSTRAINT "request_guest_profile_id_guest_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "evacuation_place" DROP CONSTRAINT "evacuation_place_host_profile_id_host_profile_profile_id_fk";
--> statement-breakpoint
DROP TABLE "guest_profile";--> statement-breakpoint
DROP TABLE "host_profile";--> statement-breakpoint
ALTER TABLE "evacuation_place" RENAME COLUMN "host_profile_id" TO "profile_id";--> statement-breakpoint
ALTER TABLE "request" RENAME COLUMN "guest_profile_id" TO "profile_id";--> statement-breakpoint
ALTER TABLE "evacuation_place" ALTER COLUMN "profile_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "request" ALTER COLUMN "profile_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "request" ALTER COLUMN "evacuation_place_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "evacuation_place" ADD COLUMN "formatted_address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "biography" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "picture_urls" text[];--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evacuation_place" ADD CONSTRAINT "evacuation_place_profile_id_profile_user_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "request" ADD CONSTRAINT "request_profile_id_profile_user_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;