BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[departments] (
    [dep_id] INT NOT NULL IDENTITY(1,1),
    [dep_name] VARCHAR(80) NOT NULL,
    CONSTRAINT [departments_pkey] PRIMARY KEY CLUSTERED ([dep_id])
);

-- CreateTable
CREATE TABLE [dbo].[roles] (
    [role_id] INT NOT NULL IDENTITY(1,1),
    [role_name] VARCHAR(30) NOT NULL,
    CONSTRAINT [roles_pkey] PRIMARY KEY CLUSTERED ([role_id])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [user_id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(20) NOT NULL,
    [password_hash] VARBINARY(max) NOT NULL,
    [password_salt] VARBINARY(max) NOT NULL,
    [first_name] VARCHAR(100) NOT NULL,
    [last_name] VARCHAR(100) NOT NULL,
    [role_id] INT NOT NULL,
    [dep_id] INT,
    [create_date] DATETIME2 NOT NULL CONSTRAINT [users_create_date_df] DEFAULT CURRENT_TIMESTAMP,
    [modified_date] DATETIME2 NOT NULL,
    [created_by_id] INT NOT NULL,
    [modified_by_id] INT NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([user_id]),
    CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username])
);

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[roles]([role_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_dep_id_fkey] FOREIGN KEY ([dep_id]) REFERENCES [dbo].[departments]([dep_id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_modified_by_id_fkey] FOREIGN KEY ([modified_by_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
