export type YearData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
};

export type Country = {
  iso_code: string;
  data: YearData[];
};

function createResource<T>(fetcher: () => Promise<T>) {
  let status = 'pending';
  let result: T;
  const suspender = fetcher().then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    },
  };
}

export const countriesResource = createResource<Record<string, Country>>(
  async () => {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
    const data = response.json();
    console.log(await data);
    return data;
  }
);
