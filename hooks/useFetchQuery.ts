import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


const endpoint = "https://pokeapi.co/api/v2/"

// loading data from an endpoint
export function useFetchQuery(path:string) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
        await wait(1)
        return fetch(endpoint + path).then(r => r.json())
    }
  })
}

// scroll to the bottom of the page to see the usage of this hook
export function useInfiniteFetchQuery(path: string) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({pageParam}) => {
      await wait(1)
      return fetch(pageParam, {
        headers: {
          Accept: 'application/json'
        }
      }).then(r => r.json())
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