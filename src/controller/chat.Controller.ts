import { Controller, Get, Render } from "@nestjs/common"


@Controller()
export class ChatController{

    @Get("teste")
    @Render("index")
    async renderPageIndex(){

    }
}
