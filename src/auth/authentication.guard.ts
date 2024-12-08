import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Authorization header missing or malformed');
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token and attach the decoded JWT token to the request
      const decoded = this.jwtService.verify(token);
      request.user = token; // Store the full JWT token in the request

      console.log('Decoded token:', decoded);  // Debugging log (optional)
      return true;  // Allow the request to proceed
    } catch (error) {
      console.log('Invalid token:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
