import { API_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import * as io from 'socket.io-client';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private socket: SocketIOClient.Socket;
  constructor(props: SocketHandlerInterfaces.Props) {
    super(props);
    this.socket = io.connect(
      API_BASE_URL,
      {
        reconnection: true,
        reconnectionDelay: 1000,
      },
    );
  }

  public componentDidMount() {
    const {
      sendCompileError,
      sendCompileSuccess,
      sendExecuteError,
      sendExecuteSuccess,
      sendInfo,
      sendSuccess,
      sendError
    } = this.props;

    this.socket.on('Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Success', (message: string) => {
      sendSuccess(message);
    });

    this.socket.on('Error', (message: string) => {
      sendError(message);
    });

    this.socket.on('connect', () => {
      sendSuccess('Connected to Server!');
    });

    this.socket.on('Compile Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Compile Success', () => {
      sendCompileSuccess();
    });

    this.socket.on('Compile Error', (message: string) => {
      sendError(`Compile Error: ${message}`);
      sendCompileError('');
    });

    this.socket.on('Compile Error Log', (log: string) => {
      sendError('Compile Error');
      sendCompileError(log);
    });

    this.socket.on('Match Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Match Error', (message: string) => {
      sendError('Match Error!');
      sendExecuteError(message);
    });

    this.socket.on('Match Success', (matchLogs: string) => {
      sendSuccess('Match Executed!');
      sendExecuteSuccess(matchLogs);
    });

    this.socket.on('disconnect', () => {
      sendError('Disconnected');
    });
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public render() {
    return null;
  }
}
