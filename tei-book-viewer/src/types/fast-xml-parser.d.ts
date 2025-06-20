declare module 'fast-xml-parser' {
  export interface XMLParserOptions {
    ignoreAttributes?: boolean;
    attributeNamePrefix?: string;
    textNodeName?: string;
    parseAttributeValue?: boolean;
  }

  export class XMLParser {
    constructor(options?: XMLParserOptions);
    parse(xml: string): any;
  }
} 