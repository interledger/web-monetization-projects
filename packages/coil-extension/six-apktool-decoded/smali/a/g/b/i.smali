.class La/g/b/i;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/b/j$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/b/j;->a(La/g/a/a/c$b;I)La/g/a/a/c$c;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "La/g/b/j$a<",
        "La/g/a/a/c$c;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic a:La/g/b/j;


# direct methods
.method constructor <init>(La/g/b/j;)V
    .locals 0

    iput-object p1, p0, La/g/b/i;->a:La/g/b/j;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(La/g/a/a/c$c;)I
    .locals 0

    invoke-virtual {p1}, La/g/a/a/c$c;->e()I

    move-result p1

    return p1
.end method

.method public bridge synthetic a(Ljava/lang/Object;)I
    .locals 0

    check-cast p1, La/g/a/a/c$c;

    invoke-virtual {p0, p1}, La/g/b/i;->a(La/g/a/a/c$c;)I

    move-result p1

    return p1
.end method

.method public b(La/g/a/a/c$c;)Z
    .locals 0

    invoke-virtual {p1}, La/g/a/a/c$c;->f()Z

    move-result p1

    return p1
.end method

.method public bridge synthetic b(Ljava/lang/Object;)Z
    .locals 0

    check-cast p1, La/g/a/a/c$c;

    invoke-virtual {p0, p1}, La/g/b/i;->b(La/g/a/a/c$c;)Z

    move-result p1

    return p1
.end method
