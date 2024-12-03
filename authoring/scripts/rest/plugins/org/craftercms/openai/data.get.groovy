import org.opensearch.client.opensearch.core.SearchRequest
import org.opensearch.client.opensearch._types.FieldValue

def siteId = params.siteId

def request = SearchRequest.of(r -> r
    .query(q -> q
        .bool(b -> b
            .should(s -> s
                .prefix(p -> p
                    .field("content-type")
                    .value("/page")
                )
            )
            .should(s -> s
                .prefix(p -> p
                    .field("content-type")
                    .value("/component")
                )
            )
        )
    )
    .from(0)
    .size(1000)
)

def authoringSearchService = applicationContext.get('authoringSearchService')
def result = authoringSearchService.search(siteId, request, Map)

if (!result) {
    return [:]
}

def items = result.hits().hits()*.source()
return [
  items: items
]