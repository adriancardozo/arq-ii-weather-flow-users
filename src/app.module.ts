import { Logger, Module } from '@nestjs/common';
import { AppController } from './adapters/primary/http/controllers/app.controller';
import { IUserService } from './bussiness/ports/input/services/i-user.service';
import { MongoUserRepository } from './adapters/secondary/mongo/repositories/mongo-user.repository';
import { IUserRepository } from './bussiness/ports/output/repositories/i-user.repository';
import { UserService } from './bussiness/services/user.service';
import { AuthController } from './adapters/primary/http/controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './bussiness/entities/user.entity';
import { UserSchema } from './adapters/secondary/mongo/schemas/document/user.schema';
import { AuthService } from './bussiness/services/auth.service';
import { IAuthService } from './bussiness/ports/input/services/i-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { BcryptHashService } from './adapters/secondary/bcrypt/services/bcrypt-hash.service';
import { IHashService } from './bussiness/ports/output/services/i-hash.service';
import { MongoTransactionService } from './adapters/secondary/mongo/services/mongo-transaction.service';
import { ITransactionService } from './bussiness/ports/output/services/i-transaction.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './adapters/primary/http/controllers/strategies/local.strategy';
import { JwtStrategy } from './adapters/primary/http/controllers/strategies/jwt.strategy';
import { UserController } from './adapters/primary/http/controllers/user.controller';
import { Alert } from './bussiness/entities/alert.entity';
import { AlertSchema } from './adapters/secondary/mongo/schemas/document/alert.schema';
import { MongoAlertRepository } from './adapters/secondary/mongo/repositories/mongo-alert.repository';
import { IAlertRepository } from './bussiness/ports/output/repositories/i-alert.repository';
import { ServiceBusAdministrationClient, ServiceBusClient } from '@azure/service-bus';
import { ServiceBusProcessorManager } from './adapters/primary/queue/helpers/service-bus-processor-manager.helper';
import { IAlertService } from './bussiness/ports/input/services/i-alert.service';
import { AlertService } from './bussiness/services/alert.service';
import { AlertProcessor } from './adapters/primary/queue/processors/alert.processor';
import { UserStationController } from './adapters/primary/http/controllers/user-station.controller';
import { UserStationService } from './bussiness/services/user-station.service';
import { IUserStationService } from './bussiness/ports/input/services/i-user-station.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';

const { mongo, jwt, service_bus, redis, cache } = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(mongo.uri),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Alert.name, schema: AlertSchema },
    ]),
    JwtModule.register({ global: true, secret: jwt.secret, signOptions: { expiresIn: '10d' } }),
    PassportModule,
    CacheModule.registerAsync({
      useFactory: async () => {
        if (cache.disabled) return { stores: [], ttl: -1 };
        const { default: KeyvRedis } = await import('@keyv/redis');
        return { stores: [new Keyv(), ...(redis.url ? [new KeyvRedis(redis.url, redis.options)] : [])] };
      },
    }),
  ],
  controllers: [AppController, AuthController, UserController, UserStationController],
  providers: [
    { provide: ServiceBusClient, useValue: new ServiceBusClient(service_bus.connection_string) },
    {
      provide: ServiceBusAdministrationClient,
      useValue: new ServiceBusAdministrationClient(service_bus.connection_string),
    },
    ServiceBusProcessorManager,
    Logger,
    AlertProcessor,
    AuthService,
    { provide: IAuthService, useExisting: AuthService },
    UserService,
    { provide: IUserService, useExisting: UserService },
    AlertService,
    { provide: IAlertService, useExisting: AlertService },
    UserStationService,
    { provide: IUserStationService, useExisting: UserStationService },
    BcryptHashService,
    { provide: IHashService, useExisting: BcryptHashService },
    MongoTransactionService,
    { provide: ITransactionService, useExisting: MongoTransactionService },
    MongoAlertRepository,
    { provide: IAlertRepository, useExisting: MongoAlertRepository },
    MongoUserRepository,
    { provide: IUserRepository, useExisting: MongoUserRepository },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
