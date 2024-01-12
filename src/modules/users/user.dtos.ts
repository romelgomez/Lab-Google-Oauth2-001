import { IsString, IsUUID, IsEmail, IsOptional, IsDate } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  familyName?: string;

  @IsString()
  @IsOptional()
  givenName?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsDate()
  @IsOptional()
  @CreateDateColumn({ nullable: true })
  created?: Date;

  @IsDate()
  @IsOptional()
  @UpdateDateColumn({ nullable: true })
  modified?: Date;

  @IsDate()
  @IsOptional()
  @DeleteDateColumn({ nullable: true })
  deleted?: Date;
}
