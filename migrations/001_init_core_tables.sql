-- Migration: Initial schema
-- Created at: 2026-01-02
-- Description: Core tables for ticket system


CREATE DATABASE ticketing_system
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;


CREATE TABLE user (
  id CHAR(36) PRIMARY KEY,

  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  
  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_user_email (email)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE role (
  id CHAR(36) PRIMARY KEY,

  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_role_name (name)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_role (
  id CHAR(36) PRIMARY KEY,

  user_id CHAR(36) NOT NULL,
  role_id CHAR(36) NOT NULL,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_user_role (user_id, role_id),

  CONSTRAINT user_role_ibfk_1
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT user_role_ibfk_2
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE category (
  id CHAR(36) PRIMARY KEY,

  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_category_name (name)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE priority (
  id CHAR(36) PRIMARY KEY,

  label VARCHAR(50) NOT NULL,
  severity_rank INT NOT NULL,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_priority_label (label),
  UNIQUE KEY uk_priority_severity (severity_rank)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ticket (
  id CHAR(36) PRIMARY KEY,

  ticket_no VARCHAR(30) NOT NULL,

  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,

  created_by CHAR(36) NOT NULL,

  requested_priority_id CHAR(36) NOT NULL,
  final_priority_id CHAR(36) NULL,

  current_status ENUM(
    'OPEN','IN_PROGRESS','WAITING','RESOLVED','CLOSED'
  ) NOT NULL DEFAULT 'OPEN',

  current_assignee_id CHAR(36) NULL,
  closed_at DATETIME NOT NULL,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,

  UNIQUE KEY uk_ticket_ticket_no (ticket_no),

  CONSTRAINT ticket_ibfk_1
    FOREIGN KEY (created_by) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_ibfk_2
    FOREIGN KEY (requested_priority_id) REFERENCES priority(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_ibfk_3
    FOREIGN KEY (final_priority_id) REFERENCES priority(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_ibfk_4
    FOREIGN KEY (current_assignee_id) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  INDEX idx_ticket_status (current_status)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ticket_assignment (
  id CHAR(36) PRIMARY KEY,

  ticket_id CHAR(36) NOT NULL,
  assigned_to CHAR(36) NOT NULL,
  assigned_by CHAR(36) NOT NULL,

  assigned_at DATETIME NOT NULL,
  unassigned_at DATETIME NOT NULL,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  CONSTRAINT ticket_assignment_ibfk_1
    FOREIGN KEY (ticket_id) REFERENCES ticket(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_assignment_ibfk_2
    FOREIGN KEY (assigned_to) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_assignment_ibfk_3
    FOREIGN KEY (assigned_by) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT

)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ticket_state_log (
  id CHAR(36) PRIMARY KEY,

  ticket_id CHAR(36) NOT NULL,
  from_state ENUM('OPEN','IN_PROGRESS','WAITING','RESOLVED','CLOSED'),
  to_state ENUM('OPEN','IN_PROGRESS','WAITING','RESOLVED','CLOSED') NOT NULL,

  changed_at DATETIME NOT NULL,
  changed_by CHAR(36) NOT NULL,
  comment VARCHAR(255),

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  CONSTRAINT ticket_state_log_ibfk_1
    FOREIGN KEY (ticket_id) REFERENCES ticket(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_state_log_ibfk_2
    FOREIGN KEY (changed_by) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT

)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ticket_comment (
  id CHAR(36) PRIMARY KEY,

  ticket_id CHAR(36) NOT NULL,
  author_id CHAR(36) NOT NULL,

  message TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT FALSE,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  CONSTRAINT ticket_comment_ibfk_1
    FOREIGN KEY (ticket_id) REFERENCES ticket(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_comment_ibfk_2
    FOREIGN KEY (author_id) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT

)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ticket_category (
  id CHAR(36) PRIMARY KEY,

  ticket_id CHAR(36) NOT NULL,
  category_id CHAR(36) NOT NULL,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_ticket_category (ticket_id, category_id),

  CONSTRAINT ticket_category_ibfk_1
    FOREIGN KEY (ticket_id) REFERENCES ticket(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ticket_category_ibfk_2
    FOREIGN KEY (category_id) REFERENCES category(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_session (
  id CHAR(36) PRIMARY KEY,

  user_id CHAR(36) NOT NULL,

  token_id VARCHAR(255) NOT NULL,   -- JWT jti (unique)

  issued_at DATETIME NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NOT NULL,

  record_status TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  created_by CHAR(36) NULL,

  UNIQUE KEY uk_user_session_token_id (token_id),

  CONSTRAINT user_session_ibfk_1
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  INDEX idx_user_session_expires (expires_at)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

