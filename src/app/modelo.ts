export class Property {
  address: string;
  contributions: Contribution[];
  location: string;

  public constructor(init?: Partial<Property>) {
    Object.assign(this, init);
  }

  selectedTotal(): number {
    let _total = 0;
    for (const c of this.contributions) {
      _total += c.selectedTotal();
    }
    return _total;
  }

  total(): number {
    let _total = 0;
    for (const c of this.contributions) {
      _total += c.total();
    }
    return _total;
  }

  showAll(): void {
    for (const c of this.contributions) {
      c.showAll();
    }
  }

  hideExpired(): void {
    for (const c of this.contributions) {
      c.hideExpired();
    }
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

  activeQuotes(year: number): Quote[] {
    return this.quotes.get(year).filter(
      q => q.active
    );
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
    for (const quoteArray of Array.from(this.quotes.values())) {
      for (const quote of quoteArray) {
        if (quote.selected) {
          _total += quote.amount;
        }
      }
    }
    return _total;
  }

  showAll(): void {
    for (const quoteArray of Array.from(this.quotes.values())) {
      for (const quote of quoteArray) {
        quote.show();
      }
    }
  }

  hideExpired(): void {
    for (const year of Array.from(this.quotes.keys())) {
      for (const quote of this.quotes.get(year)) {
        if (!quote.expired(year)) {
          quote.hide();
        }
      }
    }
  }

  total(): number {
    let _total = 0;
    for (const quote of Object.values(this.quotes)) {
      _total += quote.amount;
    }
    return _total;
  }
}

export class Quote {
  number: number;
  expiration: Expiration;
  amount: number;
  selected: boolean;
  active: boolean;

  show(): void {
    this.active = true;
  }

  hide(): void {
    this.selected = false;
    this.active = false;
  }

  public constructor(init?: Partial<Quote>) {
    this.selected = true;
    this.active = true;
    Object.assign(this, init);
  }

  expired(year: number): boolean {
    const today = Date.now();
    const expirationDate = new Date(year, this.expiration.month, this.expiration.day).valueOf();
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
