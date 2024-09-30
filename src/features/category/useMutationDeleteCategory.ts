import { useState } from "react";
import { Category, CategoryResponse } from "../../types";
import axiosInstance from "../../libs/axios";

export const useMutationDeleteCategory = (): CategoryResponse => {
  const [state, setState] = useState<Omit<CategoryResponse, 'mutate'>>({
    data: null,
    pending: false,
    error: null,
    message: '',
    status: ''
  });

  const mutate = async (data: Category) => {
    setState(prev => ({ ...prev, pending: true }));
    try {
      const response = await axiosInstance.delete(`/categories/${data.id}`);
      setState({
        data: response.data.data,
        pending: false,
        error: null,
        message: response.data.message,
        status: response.data.status
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        pending: false,
        error: err instanceof Error ? err : new Error("An error occurred while deleting the category"),
      }));
    }
  };

  return {
    ...state,
    mutate,
  };
};