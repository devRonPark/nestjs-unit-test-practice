import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { WrapDataInterceptor } from './wrap-data.interceptor';

describe('wrapDataInterceptor', () => {
  const executionContext = createMock<ExecutionContext>();
  const wrapDataInterceptor = new WrapDataInterceptor();

  it(`should wrap the next handler response in 'data' object`, (done) => {
    // Arrange
    const someData = {
      id: 1,
      email: 'john@email.com',
    };

    const callHandler = {
      handle() {
        return of(someData);
      },
    };

    // Act
    wrapDataInterceptor
      .intercept(executionContext, callHandler)
      .subscribe((asyncData) => {
        // Assert
        expect(asyncData).toEqual({
          data: { ...someData },
        });
        done();
      });
  });
});
