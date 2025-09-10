import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class SuccessResponseInterceptor<T> implements NestInterceptor<T, { success: true; data: T }> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<{ success: true; data: T }> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
