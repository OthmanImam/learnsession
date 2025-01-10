import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
//Create User using Params DTO


export class GetUserParamsDTO {
    // @ApiProperty()
    @ApiPropertyOptional(
        { description: 'User ID' }
    )
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number;
}
