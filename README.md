![Periscope Logo](/public/periscope-2x1.png)

# Periscope

[Periscope](https://periscope.corsfix.com/) is a web content reader that removes popups, ads, and annoyances, providing a clean and distraction-free reading experience.

It has a simple interface that fetches web content while applying custom rulesets to improve reading experience.

![UI](/docs/ui-wikipedia.png)

## Why make another one?

All of the existing ones are great (see [comparison](#comparison) below), but the most powerful one is [Ladder](https://github.com/everywall/ladder), because it has a domain-specific [ruleset system](https://github.com/everywall/ladder-rules). This means each website can have its own custom rules - for example, using specific request headers to properly fetch content from certain websites, rather than just using simple techniques like fetching raw HTML or spoofing the user agent as Googlebot.

While Ladder is self-hosted, Periscope provides these same powerful capabilities as a hosted service, making it more accessible to everyone.

## How It Works

```mermaid
graph LR
    A[User Input URL] --> B[Periscope Frontend]
    B --> C[proxy.corsfix.com]
    C --> D[Target Website]
    D --> C
    C --> B
    B --> E[Apply Ruleset]
    E --> F[Clean Content Display]
```

1. User enters a URL in Periscope
2. Request is proxied through proxy.corsfix.com
3. Content is fetched with custom headers and modifications
4. Site-specific ruleset is applied to remove annoyances
5. Clean content is displayed to the user

## Comparison

| Feature         | Periscope | 12ft.io | Ladder | 13ft | Smry |
| --------------- | --------- | ------- | ------ | ---- | ---- |
| Hosted Service  | ✅        | ✅      | ❌     | ✅   | ✅   |
| Custom Rulesets | ✅        | ❌      | ✅     | ❌   | ❌   |
| Open Source     | ✅        | ❌      | ✅     | ✅   | ✅   |

## Acknowledgements

- [Ladder](https://github.com/everywall/ladder) - For the ruleset and the inspiration
- [12ft.io](https://12ft.io)
- [13ft](https://github.com/wasi-master/13ft)
- [Smry](https://github.com/mrmps/SMRY)
- [Corsfix](https://corsfix.com) - For the CORS proxy service

## Disclaimer

Periscope is a powerful tool that should be used responsibly. We do not endorse or support any use of Periscope that violates websites' Terms of Service or Copyright restrictions.

---

Periscope is using CORS proxy powered by [Corsfix](https://corsfix.com).
