import org.opensearch.client.opensearch.core.SearchRequest
import org.opensearch.client.opensearch._types.FieldValue

def internalName = params.internalName
def siteId = params.siteId

def request = SearchRequest.of(r -> r
    .query(q -> q
        .match(m -> m
            .field('internal-name')
            .query(FieldValue.of(internalName))
        )
    )
)

def authoringSearchService = applicationContext.get('authoringSearchService')
def result = authoringSearchService.search(siteId, request, Map)

if (!result) {
    return [:]
}

def items = result.hits().hits()*.source()
if (!items) {
    return [:]
}

return [
    path: items[0].localId
]