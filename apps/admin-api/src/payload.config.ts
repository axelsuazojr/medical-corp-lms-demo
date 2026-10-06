import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Roles } from './collections/Roles'
import { Permissions } from './collections/Permissions'
import { Companies } from './collections/Companies'
import { Courses } from './collections/Courses'
import { Enrollments } from './collections/Enrollments'
import { Modules } from './collections/Modules'
import { Lessons } from './collections/Lessons'
import { Resources } from './collections/Resources'
import { Assignments } from './collections/Assignments'
import { Submissions } from './collections/Submissions'
import { Forums } from './collections/Forums'
import { ForumPosts } from './collections/ForumPosts'
import { Quizzes } from './collections/Quizzes'
import { Questions } from './collections/Questions'
import { QuizAttempts } from './collections/QuizAttempts'
import { QuizAnswers } from './collections/QuizAnswers'
import { Attendance } from './collections/Attendance'
import { Grades } from './collections/Grades'
import { Announcements } from './collections/Announcements'
import { Threads } from './collections/Threads'
import { Messages } from './collections/Messages'
import { Notifications } from './collections/Notifications'
import { Webinars } from './collections/Webinars'
import { Media } from './collections/Media'
import { AuditLogs } from './collections/AuditLogs'
import { ActivityEvents } from './collections/ActivityEvents'
import { withAudit } from './audit'

const filename=fileURLToPath(import.meta.url);const dirname=path.dirname(filename)
const appUrl=process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000';const adminUrl=process.env.NEXT_PUBLIC_ADMIN_URL||'http://localhost:3001'
const audited=[Users,Companies,Courses,Enrollments,Modules,Lessons,Resources,Assignments,Submissions,Forums,ForumPosts,Quizzes,Questions,QuizAttempts,Attendance,Grades,Announcements,Threads,Messages,Notifications,Webinars,ActivityEvents].map(withAudit)

export default buildConfig({
  secret:process.env.PAYLOAD_SECRET||'',
  db:postgresAdapter({pool:{connectionString:process.env.DATABASE_URL||''},idType:'uuid'}),
  editor:lexicalEditor(),
  sharp,
  collections:[...audited,Roles,Permissions,QuizAnswers,Media,AuditLogs],
  admin:{user:'users',meta:{titleSuffix:' · MEDICAL CORP'},importMap:{baseDir:path.resolve(dirname)}},
  routes:{admin:'/admin'},
  cors:[appUrl,adminUrl],
  csrf:[appUrl,adminUrl],
  typescript:{outputFile:path.resolve(dirname,'payload-types.ts')},
  maxDepth:3,
  plugins:[s3Storage({
    enabled:Boolean(process.env.S3_BUCKET&&process.env.S3_ACCESS_KEY_ID&&process.env.S3_SECRET_ACCESS_KEY),
    collections:{media:{signedDownloads:true}},
    bucket:process.env.S3_BUCKET||'disabled',
    clientUploads:true,
    config:{region:process.env.S3_REGION||'auto',endpoint:process.env.S3_ENDPOINT||undefined,forcePathStyle:Boolean(process.env.S3_ENDPOINT),credentials:{accessKeyId:process.env.S3_ACCESS_KEY_ID||'',secretAccessKey:process.env.S3_SECRET_ACCESS_KEY||''}}
  })]
})
