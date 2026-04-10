export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

function buildUrl(path, params) {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function extractError(response) {
  try {
    const data = await parseResponse(response);
    if (typeof data === "string") {
      return data;
    }

    if (data?.message) {
      return data.message;
    }
  } catch {
    return `Erro ${response.status}`;
  }

  return `Erro ${response.status}`;
}

async function request(path, options = {}, params) {
  let response;

  try {
    response = await fetch(buildUrl(path, params), {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {})
      },
      ...options
    });
  } catch {
    const error = new Error(
      `Nao consegui conectar ao back-end em ${API_URL}. Inicie a API Spring Boot ou ajuste VITE_API_URL.`
    );
    error.code = "API_UNREACHABLE";
    throw error;
  }

  if (!response.ok) {
    throw new Error(await extractError(response));
  }

  return parseResponse(response);
}

async function fetchAllPages(path, params) {
  const items = [];
  let currentPage = 0;
  let hasMore = true;

  while (hasMore) {
    const page = await request(path, {}, { ...params, page: currentPage, size: 100 });
    items.push(...(page?.content ?? []));
    currentPage += 1;
    hasMore = !(page?.last ?? true);
  }

  return items;
}

export const api = {
  listGanhos() {
    return fetchAllPages("/ganho/all");
  },
  listGastos(params) {
    return fetchAllPages("/gasto/all", params);
  },
  listCartoes() {
    return fetchAllPages("/cartao/all");
  },
  createGanho(payload) {
    return request("/ganho/create", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  updateGanho(id, payload) {
    return request(`/ganho/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },
  deleteGanho(id) {
    return request(`/ganho/delete/${id}`, { method: "DELETE" });
  },
  createGasto(payload) {
    return request("/gasto/create", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  updateGasto(id, payload) {
    return request(`/gasto/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },
  deleteGasto(id) {
    return request(`/gasto/delete/${id}`, { method: "DELETE" });
  },
  createCartao(payload) {
    return request("/cartao/create", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  updateCartao(id, payload) {
    return request(`/cartao/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  },
  deleteCartao(id) {
    return request(`/cartao/delete/${id}`, { method: "DELETE" });
  }
};
