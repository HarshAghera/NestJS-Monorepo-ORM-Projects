import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './database/database-config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomInterceptor } from './common/common.interceptor';
import { TodoModule } from './todo/todo.module';
import { AlbumModule } from './album/album.module';
import { PostModule } from './post/post.module';
import { PhotoModule } from './album/photo/photo.module';
import { CommentModule } from './post/comment/comment.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    UserModule,
    TodoModule,
    AlbumModule,
    PostModule,
    PhotoModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomInterceptor,
    },
  ],
})
export class AppModule {}
