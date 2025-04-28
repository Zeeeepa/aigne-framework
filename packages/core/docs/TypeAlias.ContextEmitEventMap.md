[@aigne/core](../wiki/Home) / ContextEmitEventMap

# Type Alias: ContextEmitEventMap

> **ContextEmitEventMap** = \{ \[K in keyof ContextEventMap\]: OmitPropertiesFromArrayFirstElement\<ContextEventMap\[K\], "contextId" \| "parentContextId" \| "timestamp"\> \}
