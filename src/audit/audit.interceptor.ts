import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    private readonly logger = new Logger(AuditInterceptor.name);

    constructor(private readonly auditService: AuditService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, url, ip } = req;
        const user = req.user; // Assuming AuthGuard runs before this and populates user

        // Skip logging for GET requests if desired to reduce noise?
        // For now, logging everything as requested "capture all user actions"

        return next
            .handle()
            .pipe(
                tap(() => {
                    if (user && user.userId) { // Only log authenticated actions
                        this.auditService.create(
                            user.userId,
                            `${method} ${url}`, // Action name
                            null, // Details (could be body?)
                            ip,
                            'SUCCESS',
                            method,
                            url
                        ).catch(err => this.logger.error(`Failed to log audit: ${err.message}`));
                    }
                }),
                catchError((err) => {
                    if (user && user.userId) {
                        this.auditService.create(
                            user.userId,
                            `${method} ${url}`,
                            `Error: ${err.message}`, // Details
                            ip,
                            'ERROR',
                            method,
                            url
                        ).catch(logErr => this.logger.error(`Failed to log audit error: ${logErr.message}`));;
                    }
                    return throwError(err);
                }),
            );
    }
}
