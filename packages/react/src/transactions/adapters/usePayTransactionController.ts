import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  PayTransaction,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { SelfFundedProtocolCallGateway } from './SelfFundedProtocolCallGateway';
import { SelfFundedProtocolCallRequest } from './SelfFundedProtocolCallRequest';

export function usePayTransactionController<T extends SupportedTransactionRequest>() {
  const { activeWallet, providerFactory, transactionQueue } = useSharedDependencies();

  return async (request: SelfFundedProtocolCallRequest<T>) => {
    const gateway = new SelfFundedProtocolCallGateway(providerFactory);

    const presenter = new PromiseResultPresenter<
      void,
      InsufficientGasError | PendingSigningRequestError | WalletConnectionError | UserRejectedError
    >();

    const payTransaction = new PayTransaction(activeWallet, gateway, presenter, transactionQueue);

    await payTransaction.execute(request);

    return presenter.asResult();
  };
}
