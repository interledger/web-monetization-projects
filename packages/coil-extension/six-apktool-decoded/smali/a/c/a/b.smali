.class La/c/a/b;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/c/a/j$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/c/a/c;->a()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/c/a/c;


# direct methods
.method constructor <init>(La/c/a/c;)V
    .locals 0

    iput-object p1, p0, La/c/a/b;->a:La/c/a/c;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/graphics/Canvas;Landroid/graphics/RectF;FLandroid/graphics/Paint;)V
    .locals 0

    invoke-virtual {p1, p2, p3, p3, p4}, Landroid/graphics/Canvas;->drawRoundRect(Landroid/graphics/RectF;FFLandroid/graphics/Paint;)V

    return-void
.end method
