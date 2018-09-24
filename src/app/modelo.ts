export class Property {
  address: string;
  contributions: Contribution[];
  location: string;

  public constructor(init?: Partial<Property>) {
    Object.assign(this, init);
  }

  total(): number {
    let _total = 0;
    for (const c of this.contributions) {
      _total += c.total();
    }
    return _total;
  }
}

export class Contribution {
  icon: string;
  name: string;
  identification: string;
  quotes: Map<number, Quote[]>;
  front: boolean;

  public constructor(init?: Partial<Contribution>) {
    this.front = false;
    Object.assign(this, init);
  }

  noneSelected(): boolean {
    if (!this.quotes || this.quotes.size === 0) {
      return true;
    }
    for (const quote of Object.values(this.quotes)) {
      if (quote.selected) {
        return false;
      }
    }
    return true;
  }

  allSelected(): boolean {
    if (!this.quotes || this.quotes.size === 0) {
      return false;
    }
    for (const quote of Object.values(this.quotes)) {
      if (!quote.selected) {
        return false;
      }
    }
    return true;
  }

  expiredSelected(): boolean {
    if (!this.quotes || this.quotes.size === 0) {
      return false;
    }
    for (const quote of Object.values(this.quotes)) {
      if ((quote.expired() && !quote.selected) || (!quote.expired() && quote.selected)) {
        return false;
      }
    }
    return true;
  }

  selectedTotal(): number {
    let _total = 0;
    for (const quote of Object.values(this.quotes)) {
      if (quote.selected) {
        _total += quote.amount;
      }
    }
    return _total;
  }

  total(): number {
    let _total = 0;
    for (const quote of Object.values(this.quotes)) {
      _total += quote.amount;
    }
    return _total;
  }
}

export interface QuoteHash {
  [year: number]: Quote;
}

export class Quote {
  number: number;
  expiration: Expiration;
  amount: number;
  selected: boolean;

  public constructor(init?: Partial<Quote>) {
    this.selected = true;
    Object.assign(this, init);
  }

  expired(year: number): boolean {
    const today = Date.now();
    const expirationDate = new Date(year, this.expiration.month, this.expiration.day).getDate();
    return today > expirationDate;
  }
}

export class Expiration {
  day: number;
  month: number;

  public constructor(init?: Partial<Expiration>) {
    Object.assign(this, init);
  }
}
