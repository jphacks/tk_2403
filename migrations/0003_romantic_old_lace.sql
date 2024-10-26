CREATE TABLE IF NOT EXISTS "favorite_evacuation_place" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" text NOT NULL,
	"evacuation_place_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "favorite_unique" UNIQUE("profile_id","evacuation_place_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_evacuation_place" ADD CONSTRAINT "favorite_evacuation_place_profile_id_profile_user_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_evacuation_place" ADD CONSTRAINT "favorite_evacuation_place_evacuation_place_id_evacuation_place_id_fk" FOREIGN KEY ("evacuation_place_id") REFERENCES "public"."evacuation_place"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
