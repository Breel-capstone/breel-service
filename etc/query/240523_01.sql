alter table
    "user" drop constraint user_role_id_fkey;

alter table
    "role_action" drop constraint role_action_action_id_fkey;

alter table
    "role_action" drop constraint role_action_role_id_fkey;

alter table
    "proposal" drop constraint proposal_project_id_fkey1;


CREATE OR REPLACE FUNCTION trigger_proposal_notification()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.status = 'approved' THEN
        INSERT INTO notification (user_id, title, message, created_at, updated_at, created_by, updated_by)
    END IF;

	RETURN NEW;
END