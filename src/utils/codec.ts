export interface WishData {
  to: string;
  from: string;
  type: 'brother' | 'sister';
  style: string;
  message: string;
}

export function encodeWishData(data: WishData): string {
  try {
    const params = new URLSearchParams();
    params.set('f', data.from);
    params.set('t', data.type);
    params.set('s', data.style);
    
    // We optionally compress or just encode the message.
    // Since we want it to look better than base64, URI encoding is fine,
    // and most modern browsers hide the query string complexity in the URL bar anyway.
    params.set('m', data.message);
    
    return params.toString();
  } catch (e) {
    console.error("Failed to encode wish data", e);
    return "";
  }
}

export function decodeWishData(toName: string, searchParams: string): WishData | null {
  try {
    const params = new URLSearchParams(searchParams);
    const from = params.get('f');
    const type = params.get('t') as 'brother' | 'sister';
    const style = params.get('s');
    const message = params.get('m');

    if (!from || !message) return null;

    return {
      to: decodeURIComponent(toName),
      from,
      type: type || 'brother',
      style: style || 'Heartfelt',
      message
    };
  } catch (e) {
    console.error("Failed to decode wish data", e);
    return null;
  }
}
