import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://Harsh:${new ConfigService().get('MONGO_DB_PASSWORD')}@cluster0.h7phtna.mongodb.net/`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
