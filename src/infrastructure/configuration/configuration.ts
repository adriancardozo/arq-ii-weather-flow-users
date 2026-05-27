import dotenv from 'dotenv';

dotenv.config({});

const service_bus_connection_string = process.env.SERVICE_BUS_CONNECTION_STRING!;

const emulator_string = 'UseDevelopmentEmulator=true';

const service_bus_emulated = (service_bus_connection_string ?? '').includes(emulator_string);

const configuration = {
  app: {
    title: 'Weather Flow',
    description: 'Weather Flow API (Arquitectura de Software II)',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    version: process.env.SELF_VERSION ?? '-',
    api_version: process.env.SELF_VERSION ?? '-',
    options: { cors: { allowedHeaders: '*' } },
    docs: { path: 'docs' },
    health_string: 'Hello World!',
    dns_servers: process.env.DNS_SERVERS?.split(',') ?? [],
  },
  mongo: { uri: process.env.MONGO_URI! },
  jwt: { secret: process.env.JWT_SECRET! },
  service_bus: { connection_string: service_bus_connection_string, emulated: service_bus_emulated },
};

export type Configuration = typeof configuration;

export default (): Configuration => configuration;
