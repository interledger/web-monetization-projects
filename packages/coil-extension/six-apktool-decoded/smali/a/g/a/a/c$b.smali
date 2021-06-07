.class public final La/g/a/a/c$b;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/a/a/c$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/g/a/a/c;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x19
    name = "b"
.end annotation


# instance fields
.field private final a:[La/g/a/a/c$c;


# direct methods
.method public constructor <init>([La/g/a/a/c$c;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, La/g/a/a/c$b;->a:[La/g/a/a/c$c;

    return-void
.end method


# virtual methods
.method public a()[La/g/a/a/c$c;
    .locals 1

    iget-object v0, p0, La/g/a/a/c$b;->a:[La/g/a/a/c$c;

    return-object v0
.end method
