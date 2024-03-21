import { Test, TestingModule } from '@nestjs/testing';
import { NestProjectController } from './nest-project.controller';
import { NestProjectService } from './nest-project.service';

describe('NestProjectController', () => {
  let nestProjectController: NestProjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestProjectController],
      providers: [NestProjectService],
    }).compile();

    nestProjectController = app.get<NestProjectController>(NestProjectController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestProjectController.getHello()).toBe('Hello World!');
    });
  });
});
