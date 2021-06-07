.class La/g/b/h;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/b/j$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/b/j;->a([La/g/f/f$b;I)La/g/f/f$b;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "La/g/b/j$a<",
        "La/g/f/f$b;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic a:La/g/b/j;


# direct methods
.method constructor <init>(La/g/b/j;)V
    .locals 0

    iput-object p1, p0, La/g/b/h;->a:La/g/b/j;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(La/g/f/f$b;)I
    .locals 0

    invoke-virtual {p1}, La/g/f/f$b;->d()I

    move-result p1

    return p1
.end method

.method public bridge synthetic a(Ljava/lang/Object;)I
    .locals 0

    check-cast p1, La/g/f/f$b;

    invoke-virtual {p0, p1}, La/g/b/h;->a(La/g/f/f$b;)I

    move-result p1

    return p1
.end method

.method public b(La/g/f/f$b;)Z
    .locals 0

    invoke-virtual {p1}, La/g/f/f$b;->e()Z

    move-result p1

    return p1
.end method

.method public bridge synthetic b(Ljava/lang/Object;)Z
    .locals 0

    check-cast p1, La/g/f/f$b;

    invoke-virtual {p0, p1}, La/g/b/h;->b(La/g/f/f$b;)Z

    move-result p1

    return p1
.end method
