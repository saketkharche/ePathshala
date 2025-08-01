package com.ePathshala.config;

import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
				.info(new Info().title("ePathshala API").version("1.0.0")
						.description("API documentation for ePathshala"))
				.components(new Components().addSecuritySchemes("bearerAuth",
						new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")
								.in(SecurityScheme.In.HEADER).name("Authorization")))
				.addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
	}

	@Bean
	public GroupedOpenApi groupedOpenApi(OpenApiCustomizer customizer) {
		return GroupedOpenApi.builder().group("ePathshala").addOpenApiCustomizer(customizer).pathsToMatch("/**")
				.build();
	}

	@Bean
	public OpenApiCustomizer customizer() {
		return openApi -> {
			// Additional customization logic if needed

		};
	}

	@Bean
	public GroupedOpenApi adminApi() {
		return GroupedOpenApi.builder().group("Admin APIs").pathsToMatch("/api/admin/**").build();
	}

	@Bean
	public GroupedOpenApi teacherApi() {
		return GroupedOpenApi.builder().group("Teacher APIs").pathsToMatch("/api/teacher/**").build();
	}

	@Bean
	public GroupedOpenApi studentApi() {
		return GroupedOpenApi.builder().group("Student APIs").pathsToMatch("/api/student/**").build();
	}

	@Bean
	public GroupedOpenApi parentApi() {
		return GroupedOpenApi.builder().group("Parent APIs").pathsToMatch("/api/parent/**").build();
	}
}