import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("My first nest backend app")
    .setDescription("Rest api documentation")
    .setVersion("1.0.0")
    .addTag("Nguyen Tien Hoach")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document)

  await app.listen(PORT, () => console.log("server running at port: " + PORT));
}

start();
