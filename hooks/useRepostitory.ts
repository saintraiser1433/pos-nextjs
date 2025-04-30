// src/hooks/useRepository.ts
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    Method,
  } from 'axios';
  import { useMemo } from 'react';
  
  type RepositoryConfig = {
    baseURL?: string;
    axiosConfig?: AxiosRequestConfig;
    onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    onResponse?: (response: AxiosResponse) => AxiosResponse;
    onError?: (error: AxiosError) => void;
  };
  
  type RequestOptions = {
    method?: Method;
    url?: string;
    data?: any;
    config?: AxiosRequestConfig;
  };
  
  export const useRepository = <T = any>(basePath: string, repositoryConfig?: RepositoryConfig) => {
    const api: AxiosInstance = useMemo(() => {
      const instance = axios.create({
        baseURL: repositoryConfig?.baseURL || process.env.NEXT_PUBLIC_API_URL,
        headers: {
          'Content-Type': 'application/json',
          ...repositoryConfig?.axiosConfig?.headers,
        },
        ...repositoryConfig?.axiosConfig,
      });
  
      if (repositoryConfig?.onRequest) {
        instance.interceptors.request.use(repositoryConfig.onRequest);
      }
  
      if (repositoryConfig?.onResponse) {
        instance.interceptors.response.use(repositoryConfig.onResponse);
      }
  
      if (repositoryConfig?.onError) {
        instance.interceptors.response.use(
          response => response,
          error => {
            repositoryConfig.onError?.(error);
            return Promise.reject(error);
          }
        );
      }
  
      return instance;
    }, [basePath, repositoryConfig]);
  
    const request = async <D = any, R = T>(options: RequestOptions): Promise<R> => {
      try {
        const { data } = await api.request<R>({
          method: options.method || 'GET',
          url: options.url || basePath,
          data: options.data,
          ...options.config,
        });
        return data;
      } catch (error) {
        throw error;
      }
    };
  
    const getAll = async (config?: AxiosRequestConfig): Promise<T[]> => {
      return request<never, T[]>({ config });
    };
  
    const getById = async (id: string | number, config?: AxiosRequestConfig): Promise<T> => {
      return request<never, T>({ url: `${basePath}/${id}`, config });
    };
  
    const create = async <D = any>(payload: D, config?: AxiosRequestConfig): Promise<T> => {
      return request<D, T>({ method: 'POST', data: payload, config });
    };
  
    const update = async <D = any>(
      id: string | number,
      payload: D,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      return request<D, T>({ method: 'PUT', url: `${basePath}/${id}`, data: payload, config });
    };
  
    const patch = async <D = any>(
      id: string | number,
      payload: D,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      return request<D, T>({ method: 'PATCH', url: `${basePath}/${id}`, data: payload, config });
    };
  
    const deleteById = async (id: string | number, config?: AxiosRequestConfig): Promise<void> => {
      return request<never, void>({ method: 'DELETE', url: `${basePath}/${id}`, config });
    };
  
    return {
      request,
      getAll,
      getById,
      create,
      update,
      patch,
      delete: deleteById,
      api, // expose axios instance if needed
    };
  };