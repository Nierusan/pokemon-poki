import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


const endpoint = "https://pokeapi.co/api/v2/"

type API = {
  "/pokemon?limit=21": {
    count: number,
    next: string | null,
    results: {name: string, url: string}[]
  }
}

// loading data from an endpoint
export function useFetchQuery<T extends keyof API>(path: T) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
        await wait(1)
        return fetch(endpoint + path).then(r => r.json() as Promise<API[T]>)
    }
  })
}

// scroll to the bottom of the page to see the usage of this hook
export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({pageParam}) => {
      await wait(1)
      return fetch(pageParam, {
        headers: {
          Accept: 'application/json'
        }
      }).then(r => r.json() as Promise<API[T]>)
    },
    getNextPageParam: (lastPage, pages) => {
      if ("next" in lastPage) {
        return lastPage.next
      }
      return null
    }
  })
}

// wait for a duration
function wait (duration: number) {
  return  new Promise((resolve) => setTimeout(resolve, duration * 1000))
}