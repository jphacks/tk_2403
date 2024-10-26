DELETE FROM "evacuation_place";--> statement-breakpoint
ALTER TABLE "evacuation_place" ALTER COLUMN "picture_paths" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "evacuation_place" ALTER COLUMN "picture_urls" SET NOT NULL;--> statement-breakpoint
DELETE FROM "profile";--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "picture_paths" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "picture_urls" SET NOT NULL;