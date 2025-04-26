CREATE TABLE "chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text,
	"abstract" text,
	"metadata" jsonb,
	"index" integer,
	"type" varchar,
	"client_id" text,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chunks_client_id_user_id_unique" UNIQUE("client_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chunk_id" uuid,
	"embeddings" vector(1024),
	"model" text,
	"client_id" text,
	"user_id" uuid,
	CONSTRAINT "embeddings_chunk_id_unique" UNIQUE("chunk_id"),
	CONSTRAINT "embeddings_client_id_user_id_unique" UNIQUE("client_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "chunks" ADD CONSTRAINT "chunks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_chunk_id_chunks_id_fk" FOREIGN KEY ("chunk_id") REFERENCES "public"."chunks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;