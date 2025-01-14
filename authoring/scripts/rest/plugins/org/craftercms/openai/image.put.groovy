import groovy.json.JsonSlurper
import jakarta.servlet.http.HttpServletResponse
import java.io.InputStream
import org.apache.http.HttpEntity
import org.apache.http.client.methods.CloseableHttpResponse
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.CloseableHttpClient
import org.apache.http.impl.client.HttpClients

def result = [:]
def invalidParams = false
def paramsList = []
def reader = request.getReader()
def body = ''

def content = reader.readLine()
while (content != null) {
    body += content
    content = reader.readLine()
}

if (!body) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST)
    result.message = 'Body is empty.'
    return result
}
def postParams = new JsonSlurper().parseText(body)

if (!postParams) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST)
    result.message = 'Body is empty.'
    return result
}

def siteId = params.siteId
def url = postParams.url
def path = postParams.path
def name = postParams.name

if (!siteId) {
    invalidParams = true
    paramsList += 'siteId'
}

if (!url) {
    invalidParams = true
    paramsList += 'url'
}

if (!path) {
    invalidParams = true
    paramsList += 'path'
}

if (!name) {
    invalidParams = true
    paramsList += 'name'
}

if (invalidParams) {
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST)
    result.message = 'Invalid parameter(s): ' + paramsList
    return result
}

CloseableHttpClient httpClient = HttpClients.createDefault()
HttpGet request = new HttpGet(url)

try (CloseableHttpResponse res = httpClient.execute(request)) {
    HttpEntity entity = res.getEntity()
    if (entity != null) {
        def contentService = applicationContext.get('cstudioContentService')
        InputStream inputStream = entity.getContent();
        contentService.writeContentAsset(siteId, path, name, inputStream, 'true', '', '', '', 'false', 'true', 'false')
        return 'OK'
    }

    return null
}