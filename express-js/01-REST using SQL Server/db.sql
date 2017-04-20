USE [SampleDb]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Emp_Dept]') AND parent_object_id = OBJECT_ID(N'[dbo].[Emp]'))
ALTER TABLE [dbo].[Emp] DROP CONSTRAINT [FK_Emp_Dept]
GO
/****** Object:  Table [dbo].[Emp]    Script Date: 12/23/2015 4:45:03 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Emp]') AND type in (N'U'))
DROP TABLE [dbo].[Emp]
GO
/****** Object:  Table [dbo].[Dept]    Script Date: 12/23/2015 4:45:03 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Dept]') AND type in (N'U'))
DROP TABLE [dbo].[Dept]
GO
/****** Object:  Table [dbo].[Dept]    Script Date: 12/23/2015 4:45:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Dept]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Dept](
	[Deptno] [int] NOT NULL,
	[Dname] [nvarchar](50) NULL,
 CONSTRAINT [PK_Dept] PRIMARY KEY CLUSTERED 
(
	[Deptno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[Emp]    Script Date: 12/23/2015 4:45:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Emp]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Emp](
	[Empno] [int] NOT NULL,
	[Ename] [nvarchar](50) NULL,
	[Sal] [float] NULL,
	[Deptno] [int] NULL,
 CONSTRAINT [PK_Emp] PRIMARY KEY CLUSTERED 
(
	[Empno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
INSERT [dbo].[Dept] ([Deptno], [Dname]) VALUES (10, N'Accounting')
GO
INSERT [dbo].[Dept] ([Deptno], [Dname]) VALUES (20, N'Sales')
GO
INSERT [dbo].[Dept] ([Deptno], [Dname]) VALUES (30, N'IT')
GO
INSERT [dbo].[Dept] ([Deptno], [Dname]) VALUES (40, N'Production')
GO
INSERT [dbo].[Emp] ([Empno], [Ename], [Sal], [Deptno]) VALUES (1001, N'Jag', 3400, 10)
GO
INSERT [dbo].[Emp] ([Empno], [Ename], [Sal], [Deptno]) VALUES (1002, N'Chat', 4500, 20)
GO
INSERT [dbo].[Emp] ([Empno], [Ename], [Sal], [Deptno]) VALUES (1003, N'Dhan', 5600, 10)
GO
INSERT [dbo].[Emp] ([Empno], [Ename], [Sal], [Deptno]) VALUES (1004, N'Win', 2300, 30)
GO
INSERT [dbo].[Emp] ([Empno], [Ename], [Sal], [Deptno]) VALUES (1005, N'Scott', 7600, 10)
GO
INSERT [dbo].[Emp] ([Empno], [Ename], [Sal], [Deptno]) VALUES (1006, N'Smith', 4300, 20)
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Emp_Dept]') AND parent_object_id = OBJECT_ID(N'[dbo].[Emp]'))
ALTER TABLE [dbo].[Emp]  WITH CHECK ADD  CONSTRAINT [FK_Emp_Dept] FOREIGN KEY([Deptno])
REFERENCES [dbo].[Dept] ([Deptno])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Emp_Dept]') AND parent_object_id = OBJECT_ID(N'[dbo].[Emp]'))
ALTER TABLE [dbo].[Emp] CHECK CONSTRAINT [FK_Emp_Dept]
GO
