alter table
    "user" drop constraint user_role_id_fkey;

alter table
    "role_action" drop constraint role_action_action_id_fkey;

alter table
    "role_action" drop constraint role_action_role_id_fkey;

alter table
    "proposal" drop constraint proposal_project_id_fkey1;