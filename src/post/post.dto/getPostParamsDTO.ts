import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetPostParams {
        
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