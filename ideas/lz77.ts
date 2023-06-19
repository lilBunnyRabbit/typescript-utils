export namespace LZ77 {
  export type Dict = [distance: number, length: number, character: string][];

  export function encode_unlimited(data: string): Dict {
    const dict: Dict = [[0, 0, data[0] || ""]];

    for (let i = 1; i < data.length; i++) {
      let best: [distance: number, length: number] = [0, 0];
      for (let j = i - 1; j >= 0; j--) {
        if (data[j] !== data[i]) continue;

        const distance = i - j;
        for (let k = 1; k < data.length - i; k++) {
          if (data[i + k] !== data[j + (k % distance)]) {
            if (k > best[1]) best = [distance, k];
            break;
          }
        }
      }

      if (best[1] > 0) {
        dict.push([...best, data[(i += best[1])] || ""]);
        continue;
      }

      dict.push([0, 0, data[i]]);
    }

    return dict;
  }

  export function encode(data: string, searchBuffer = 255, lookAheadBuffer = 255): Dict {
    const dict: Dict = [[0, 0, data[0] || ""]];

    for (let i = 1; i < data.length; i++) {
      let best: [distance: number, length: number] = [0, 0];
      const searchLimit = i - searchBuffer > 0 ? i - searchBuffer : 0;
      for (let j = i - 1; j >= searchLimit; j--) {
        if (data[j] !== data[i]) continue;

        const distance = i - j;
        const lookAheadLimit = lookAheadBuffer + 1 <= data.length - i ? lookAheadBuffer + 1 : data.length - i;
        for (let k = 1; k < lookAheadLimit; k++) {
          if (data[i + k] !== data[j + (k % distance)]) {
            if (k > best[1]) best = [distance, k];
            break;
          }
        }
      }

      if (best[1] > 0) {
        dict.push([...best, data[(i += best[1])] || ""]);
        continue;
      }

      dict.push([0, 0, data[i]]);
    }

    return dict;
  }

  export function decode(dict: Dict): string {
    let data = "";

    for (let i = 0; i < dict.length; i++) {
      const [distance, length, character] = dict[i];

      let prefix = "";
      const offset = data.length - distance;
      for (let j = 0; j < length; j++) {
        prefix += data[offset + (j % distance)];
      }

      data += prefix + character;
    }

    return data;
  }

  export function decode_from_bin(bin: string): string {
    let data = "";

    const bytes = Number.parseInt(bin.substring(0, 2), 2); // First 2b number of bytes per value
    const bits = 8 * bytes;
    for (let i = 2; i < bin.length; i += bits * 3) {
      const distance = Number.parseInt(bin.substring(i, i + bits), 2);
      const length = Number.parseInt(bin.substring(i + bits, i + 2 * bits), 2);
      const character = String.fromCharCode(parseInt(bin.substring(i + 2 * bits, i + 3 * bits), 2));

      let prefix = "";
      const offset = data.length - distance;
      for (let j = 0; j < length; j++) {
        prefix += data[offset + (j % distance)];
      }

      data += prefix + character;
    }

    return data;
  }

  export function dict_to_string(dict: Dict) {
    return dict.map(([d, l, c]) => `(${d}, ${l}, ${c})`).join("");
  }

  export function print(dict: Dict) {
    console.log(dict.map(([d, l, c]) => `(${d}, ${l}, ${c})`).join(",\n"));
  }

  export function dict_to_bin(dict: Dict): string {
    let maxBin = 0;

    for (let i = 0; i < dict.length; i++) {
      const [d, l, c] = dict[i];
      const max = Math.max(d.toString(2).length, l.toString(2).length, c.charCodeAt(0).toString(2).length);
      if (max > maxBin) maxBin = max;
    }

    const bytes = Math.ceil(maxBin / 8);
    const bits = 8 * bytes;

    let bin = bytes.toString(2).padStart(2, "0"); // First 2b number of bytes per value
    for (let i = 0; i < dict.length; i++) {
      const [d, l, c] = dict[i];
      bin += d.toString(2).padStart(bits, "0");
      bin += l.toString(2).padStart(bits, "0");
      bin += c.charCodeAt(0).toString(2).padStart(bits, "0");
    }

    return bin;
  }

  export function bin_to_dict(bin: string): Dict {
    const bytes = Number.parseInt(bin.substring(0, 2), 2); // First 2b number of bytes per value
    const bits = 8 * bytes;

    const dict: Dict = [];
    for (let i = 2; i < bin.length; i += bits * 3) {
      dict.push([
        Number.parseInt(bin.substring(i, i + bits), 2),
        Number.parseInt(bin.substring(i + bits, i + 2 * bits), 2),
        String.fromCharCode(parseInt(bin.substring(i + 2 * bits, i + 3 * bits), 2)),
      ]);
    }

    return dict;
  }

  export function dict_size(dict: Dict): number {
    return dict_to_bin(dict).length;
  }
}
